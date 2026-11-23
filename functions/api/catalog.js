// Circuit Loop Hub — Cloudflare Pages Catalog API

export async function onRequestGet(context) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };

  try {
    const apiUrl = context.env.SHEETS_API_URL;

    if (!apiUrl) {
      throw new Error("Google Sheets API is not configured");
    }

    const response = await fetch(apiUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      throw new Error("Google Sheets API request failed");
    }

    const data = await response.json();

    if (
      data.success !== true ||
      !Array.isArray(data.products)
    ) {
      throw new Error("Invalid inventory response");
    }

    const publicFields = [
      "modelId",
      "unitId",
      "productName",
      "category",
      "brand",
      "availability",
      "qaStatus",
      "pricePHP",
      "physicalGrade",
      "conditionNotes",
      "latestQaDate",
      "photoUrl",
      "passportUrl",
    ];

    const products = data.products
      .filter(
        (unit) =>
          unit &&
          unit.unitId &&
          unit.availability === "Available" &&
          unit.qaStatus === "Passed" &&
          Number(unit.pricePHP) > 0
      )
      .map((unit) =>
        Object.fromEntries(
          publicFields.map((field) => [
            field,
            unit[field] ?? null,
          ])
        )
      );

    return new Response(
      JSON.stringify({
        success: true,
        business: "Circuit Loop Hub",
        totalProducts: products.length,
        products,
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error("Catalog API error:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to retrieve catalog data",
      }),
      {
        status: 502,
        headers,
      }
    );
  }
}