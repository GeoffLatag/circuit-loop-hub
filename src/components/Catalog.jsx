import { useEffect, useState } from "react";

// Format prices in Philippine pesos
function formatPrice(price) {
  return `₱${Number(price).toLocaleString("en-PH")}`;
}

// Group individual components by product model
function groupProducts(units) {
  const grouped = new Map();

  units.forEach((unit) => {
    const modelId = String(unit.modelId || "").trim();

    if (!modelId || !unit.unitId) return;

    if (!grouped.has(modelId)) {
      grouped.set(modelId, {
        modelId,
        productName: unit.productName || modelId,
        category: unit.category || "Electronics",
        brand: unit.brand || "",
        units: [],
      });
    }

    grouped.get(modelId).units.push(unit);
  });

  return Array.from(grouped.values());
}

function Catalog() {
  const [search, setSearch] = useState("");
  const [selectedModelId, setSelectedModelId] = useState(null);

  // Live inventory
  const [units, setUnits] = useState([]);

  // Connection states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  // Retrieve inventory from our Google Sheets API
  useEffect(() => {
    const controller = new AbortController();

    async function loadCatalog() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch("/api/catalog", {
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        if (
          data.success !== true ||
          !Array.isArray(data.products)
        ) {
          throw new Error("Invalid catalog data");
        }

        // Additional safety filtering
        const availableUnits = data.products.filter(
          (unit) =>
            unit.availability === "Available" &&
            unit.qaStatus === "Passed" &&
            Number(unit.pricePHP) > 0
        );

        setUnits(availableUnits);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Catalog loading failed:", err);

          setError(
            "Unable to load the catalog. Please try again."
          );

          setUnits([]);
        }

      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadCatalog();

    return () => controller.abort();

  }, [refreshKey]);

  // Organize individual units into product models
  const products = groupProducts(units);

  // Search
  const filteredProducts = products.filter((product) =>
    `${product.productName} ${product.category} ${product.brand}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Currently selected model
  const selectedModel = products.find(
    (product) => product.modelId === selectedModelId
  );

  return (
    <section
      id="catalog"
      className="min-h-screen bg-slate-50 px-6 py-24 text-slate-900"
    >
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADER */}
        <div className="mb-12">

          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Component Marketplace
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Our Catalog
          </h2>

          <p className="mt-5 max-w-2xl text-lg text-slate-500">
            Browse available electronic components, compare
            individual units, and review their documented
            testing information.
          </p>

          <div className="mt-5 inline-block rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Connected to Google Sheets · Development Preview
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Sample inventory may be displayed during development.
          </p>

        </div>


        {/* SEARCH AND REFRESH */}
        <div className="mb-10 flex flex-wrap items-center gap-4">

          <input
            type="search"
            placeholder="Search components..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full max-w-xl flex-1 rounded-xl border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="button"
            onClick={() => setRefreshKey((key) => key + 1)}
            disabled={loading}
            className="rounded-xl border border-blue-200 bg-white px-6 py-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
          >
            ↻ Refresh Catalog
          </button>

        </div>


        {/* LOADING STATE */}
        {loading && (
          <div
            role="status"
            className="rounded-2xl border border-slate-200 bg-white p-12 text-center"
          >
            <p className="text-lg font-semibold text-slate-700">
              Loading inventory...
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Retrieving available components.
            </p>
          </div>
        )}


        {/* ERROR STATE */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"
          >
            <p className="font-semibold text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => setRefreshKey((key) => key + 1)}
              className="mt-4 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        )}


        {/* LIVE PRODUCT GRID */}
        {!loading && !error && (
          <>
            <div className="mb-6 text-sm text-slate-500">
              {filteredProducts.length} product model(s) ·{" "}
              {units.length} available unit(s)
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

              {filteredProducts.map((product) => {

                const startingPrice = Math.min(
                  ...product.units.map(
                    (unit) => Number(unit.pricePHP)
                  )
                );

                return (
                  <button
                    key={product.modelId}
                    type="button"
                    onClick={() =>
                      setSelectedModelId(product.modelId)
                    }
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                  >

                    {/* PRODUCT VISUAL */}
                    <div className="flex h-52 items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">

                      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-blue-200 bg-white shadow-lg">

                        <span className="text-4xl">
                          ⚡
                        </span>

                      </div>

                    </div>


                    {/* PRODUCT INFORMATION */}
                    <div className="p-6">

                      <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        {product.category}
                      </p>

                      <h3 className="mt-3 text-xl font-bold">
                        {product.productName}
                      </h3>

                      <p className="mt-3 text-sm text-slate-500">
                        {product.brand}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">

                        <div>
                          <p className="text-xs text-slate-400">
                            Starting at
                          </p>

                          <p className="text-2xl font-bold text-blue-600">
                            {formatPrice(startingPrice)}
                          </p>
                        </div>

                        <div className="text-right">

                          <p className="text-sm font-semibold text-slate-700">
                            {product.units.length} Available
                          </p>

                          <p className="mt-1 text-xs text-blue-600">
                            View Units →
                          </p>

                        </div>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>


            {/* EMPTY RESULTS */}
            {filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

                <p className="text-lg font-semibold">
                  No components found.
                </p>

                <p className="mt-2 text-slate-500">
                  Try another search or check back later.
                </p>

              </div>
            )}
          </>
        )}


        {/* INDIVIDUAL UNITS */}
        {!loading && !error && selectedModel && (

          <div className="mt-16 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-10">

            <div className="flex flex-wrap items-center justify-between gap-4">

              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Available Units
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {selectedModel.productName}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedModelId(null)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Close
              </button>

            </div>


            {/* UNIT CARDS */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {selectedModel.units.map((unit) => (

                <div
                  key={unit.unitId}
                  className="rounded-2xl border border-slate-200 p-6"
                >

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <span className="text-xs font-semibold text-slate-500">
                      {unit.unitId}
                    </span>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      QA Logged: {unit.qaStatus}
                    </span>

                  </div>

                  <h4 className="mt-5 text-lg font-bold">
                    {selectedModel.productName}
                  </h4>

                  <p className="mt-2 text-sm text-slate-500">
                    Physical Grade: {unit.physicalGrade}
                  </p>

                  <p className="mt-2 text-sm text-slate-500">
                    Condition: {unit.conditionNotes || "Not specified"}
                  </p>

                  <div className="mt-6 border-t border-slate-100 pt-5">

                    <p className="text-2xl font-bold text-blue-600">
                      {formatPrice(unit.pricePHP)}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      Individual component record
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        )}

      </div>
    </section>
  );
}

export default Catalog;