import React, { useState } from "react";

export default function Dashboard() {
  const [recommendation, setRecommendation] = useState("");

  const [age, setAge] = useState("");
  const [skinType, setSkinType] = useState("");
  const [issue, setIssue] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [market, setMarket] = useState("");
  const [brand, setBrand] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(recommendation);
    setIsCopied(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnRecommendation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        age,
        skinType,
        issue,
        priceRange,
        market,
        brand,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setRecommendation(data.recommendation.trim());
  };

  return (
    <div className="max-w-7xl w-[380px] lg:w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="">
        <div className="">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="flex flex-col bg-slate-500/40 px-8 py-4 rounded-3xl mb-6">
              <label className="sr-only" htmlFor="ageGroup">
                Age Group
              </label>
              <select
                className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
                name="name"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              >
                <option value="default">Select Age Group</option>
                <option value="teen">Teen 13-17</option>
                <option value="young adult">Young Adult 18-25</option>
                <option value="adult">Adult 25-35</option>
                <option value="middle">Middle Age 35-45</option>
                <option value="older adult">Older Adult Age 45-60</option>
              </select>
            </div>
            <div className="flex flex-col  bg-slate-500/40 px-8 py-4 rounded-3xl mb-6">
              <label htmlFor="skinType" className="sr-only">
                Your Skin Type
              </label>
              <select
                value={skinType}
                onChange={(e) => setSkinType(e.target.value)}
                className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
                name="position"
                id="position"
                required
              >
                <option value="default">Select Skin Type</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="normal">Normal</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
              </select>
            </div>
            <div className="flex flex-col  bg-slate-500/40 px-8 py-4 rounded-3xl mb-6">
              <label htmlFor="issue" className="sr-only">
                Skin Issues
              </label>
              <select
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                name="issue"
                id="issue"
                className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
              >
                <option value="default">Select Your Skin's issue</option>
                <option value="acne">Acne</option>
                <option value="acne scars">Acne Scars</option>
                <option value="eczema">Eczema</option>
                <option value="skin texture">Skin Texture</option>
                <option value="hyperpigmentation">Hyperpigmentation</option>
                <option value="wrinkles">Wrinkles</option>
              </select>
            </div>
            <div className="flex flex-col  bg-slate-500/40 px-8 py-4 rounded-3xl mb-6">
              <label className="sr-only" htmlFor="priceRange">
                Price Range
              </label>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
                name="priceRange"
                id="priceRange"
              >
                <option value="default">Select Price Range</option>
                <option value="low">Low Cost</option>
                <option value="mid">Mid Range</option>
                <option value="expensive">Expensive</option>
              </select>
            </div>
            <div className="flex flex-col  bg-slate-500/40 px-8 py-4 rounded-3xl mb-6">
              <label htmlFor="market" className="sr-only">
                Market
              </label>
              <select
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
                name="market"
                id="market"
              >
                <option value="default">Select Skin Care Market</option>
                <option value="europe">Europe</option>
                <option value="north america">North America</option>
                <option value="korea">Korea</option>
                <option value="japan">Japan</option>
              </select>
            </div>
            <div className="flex flex-col  bg-slate-500/40 px-8 py-4 rounded-3xl mb-6">
              <label htmlFor="brand" className="sr-only">
                Brand (Optional)
              </label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Brand (Optional)"
                type="text"
                name="brand"
                id="brand"
              />
            </div>

            <button
              className={`w-full text-white font-bold mt-6 py-2 px-4 rounded-3xl bg-gradient-to-r from-pink-500 to-yellow-500  hover:from-pink-600 hover:to-yellow-600
                ${isGenerating === "" ? "cursor-not-allowed opacity-50" : ""}`}
              type="submit"
              disabled={isGenerating === ""}
            >
              {isGenerating ? "Generating..." : "Generate Recommendation"}
            </button>
          </form>
        </div>
        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>
            <textarea
              rows={
                recommendation === ""
                  ? 7
                  : recommendation.split("\n").length + 12
              }
              name="output"
              value={recommendation}
              onChange={(e) => setRecommendation(e.target.value)}
              disabled={recommendation === ""}
              id="output"
              placeholder="AI Generated Skincare Routine"
              className="block w-full rounded-3xl bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-6 py-3 placeholder-gray-500 my-2 text-gray-900"
            />
            <button
              onClick={handleCopy}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-3xl"
              type="submit"
              disabled={recommendation === ""}
            >
              {isCopied ? "Copied" : "Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
