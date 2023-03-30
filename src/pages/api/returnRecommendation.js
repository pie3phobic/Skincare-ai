const generateRecommendation = async ({
  age,
  skinType,
  issue,
  priceRange,
  market,
  brand,
}) => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: `Suggest skincare routine products for ${age} ${skinType} skin with ${issue}. The products should be of ${priceRange} price range, from ${market}. ${
            brand ? `Use products from ${brand}.` : ""
          }`,
          max_tokens: 200,
          temperature: 0.5,
        }),
      }
    );
    const data = await response.json();
    console.log(data.choices[0].text);

    return data.choices[0].text;
  } catch (err) {
    console.error(err);
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
