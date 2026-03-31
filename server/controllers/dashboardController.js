const Violation = require("../models/Violation");

// Seed dummy data (first time)
async function seedIfEmpty() {
  const count = await Violation.countDocuments();
  if (count > 0) return;

  console.log(" Seeding database...");

  const categories = [
    "Control Direction/Path",
    "Control Speed",
    "Loss of Propulsion",
    "Others",
  ];
  const dealers = ["Dealer A", "Dealer B", "Dealer C", "Dealer D", "Dealer E"];
  const models = ["Santa Fe", "Tucson", "Creta", "Venue", "i20"];
  const types = ["Accelerating", "Slipping", "Noise", "Others"];

  const docs = [];
  for (let year = 2015; year <= 2020; year++) {
    for (let i = 0; i < 60; i++) {
      docs.push({
        year,
        category: categories[Math.floor(Math.random() * categories.length)],
        dealer: dealers[Math.floor(Math.random() * dealers.length)],
        model: models[Math.floor(Math.random() * models.length)],
        type: types[Math.floor(Math.random() * types.length)],
      });
    }
  }

  await Violation.insertMany(docs);
  console.log(" Seeded 360 violations!");
}

// GET /api/dashboard
const getDashboardData = async (req, res) => {
  try {
    await seedIfEmpty();

    // 1. Dealer-wise claims (bar chart)
    const dealerAgg = await Violation.aggregate([
      { $group: { _id: "$year", claims: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);
    const dealerClaims = dealerAgg.map((d) => ({
      year: String(d._id),
      claims: d.claims,
    }));

    // 2. Violation categories (donut chart)
    const catAgg = await Violation.aggregate([
      { $group: { _id: "$category", value: { $sum: 1 } } },
    ]);
    const violationCats = catAgg.map((c) => ({ name: c._id, value: c.value }));

    // 3. Model-wise claims (grouped bar)
    const modelAgg = await Violation.aggregate([
      {
        $group: { _id: { model: "$model", type: "$type" }, count: { $sum: 1 } },
      },
    ]);
    const modelMap = {};
    modelAgg.forEach(({ _id, count }) => {
      if (!modelMap[_id.model]) modelMap[_id.model] = { model: _id.model };
      modelMap[_id.model][_id.type] = count;
    });
    const modelClaims = Object.values(modelMap);

    // 4. Trend data (line chart)
    const trendAgg = await Violation.aggregate([
      {
        $group: {
          _id: { year: "$year", category: "$category" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1 } },
    ]);
    const years = [2015, 2016, 2017, 2018, 2019, 2020];
    const trendData = years.map((year) => {
      const row = { year: String(year) };
      trendAgg
        .filter((t) => t._id.year === year)
        .forEach((t) => {
          if (t._id.category === "Control Direction/Path")
            row.ControlDir = t.count;
          if (t._id.category === "Control Speed") row.ControlSpd = t.count;
          if (t._id.category === "Loss of Propulsion") row.LossProp = t.count;
        });
      return row;
    });

    // 5. Stats cards
    const total = await Violation.countDocuments();
    const dealerCount = (await Violation.distinct("dealer")).length;

    res.json({
      stats: [
        {
          label: "Total Amount Claimed",
          value: String(total),
          yoy: "+2%",
          qoq: "+0.2%",
        },
        { label: "Variants", value: "430", yoy: "+5%", qoq: "+1%" },
        {
          label: "Dealers",
          value: String(dealerCount),
          yoy: "+15%",
          qoq: "+0.1%",
        },
        { label: "Units in Operation", value: "1.2M", yoy: "+16%", qoq: "+3%" },
        { label: "Warranty Claims", value: "1259", yoy: "+2%", qoq: "+0.2%" },
        {
          label: "Service Complaints",
          value: "1500",
          yoy: "+1%",
          qoq: "+0.6%",
        },
      ],
      highlights: [
        {
          label: "Most occurring Violation Category",
          value: "Speed Controlling",
          yoy: "12%",
          qoq: "1.2%",
        },
        {
          label: "Model with Most Claims",
          value: "Santa Fe",
          yoy: "3%",
          qoq: "0.1%",
        },
        {
          label: "Part with Most Claims",
          value: "Ignition",
          yoy: "10%",
          qoq: "2%",
        },
      ],
      dealerClaims,
      violationCats,
      modelClaims,
      trendData,
    });
  } catch (err) {
    console.error("getDashboardData error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET /api/violations
const getAllViolations = async (req, res) => {
  try {
    const filter = {};
    if (req.query.year) filter.year = Number(req.query.year);
    if (req.query.model) filter.model = req.query.model;

    const data = await Violation.find(filter).sort({ year: -1 }).limit(100);
    res.json({ count: data.length, data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// POST /api/violations
const createViolation = async (req, res) => {
  try {
    const doc = new Violation(req.body);
    await doc.save();
    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getDashboardData, getAllViolations, createViolation };
