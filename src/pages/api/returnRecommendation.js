const generateRecommendation = async ({
  age,
  skinType,
  issue,
  priceRange,
  market,
  brand,
}) => {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: `Suggest skincare routine products for ${age} ${skinType} skin with ${issue}. The products should be of ${priceRange} price range, from ${market}. ${
              brand ? `Use products from ${brand}.` : ""
            }`,
          },
        ],
      }),
    });
    const data = await response.json();

    console.log("API Response:", data);

    if (!data.choices || data.choices.length === 0) {
      console.error("No choices in API response.");
      return null;
    }

    const recommendation = data.choices[0].message.content;
    console.log("Recommendation:", recommendation);

    return recommendation;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default async function handler(req, res) {
  const { age, skinType, issue, priceRange, market, brand } = req.body;

  const recommendation = await generateRecommendation({
    age,
    skinType,
    issue,
    priceRange,
    market,
    brand,
  });

  res.status(200).json({
    recommendation,
  });
}
