function formatPrice(price) {
  return `₱${Number(price).toLocaleString("en-PH")}`;
}

// Only display usable public links.
// Placeholder links remain hidden.
function validPublicUrl(value) {
  if (typeof value !== "string") return null;

  try {
    const url = new URL(value);

    if (!["https:", "http:"].includes(url.protocol)) {
      return null;
    }

    if (
      url.hostname === "example.com" ||
      url.hostname.endsWith(".example.com")
    ) {
      return null;
    }

    return url.href;
  } catch {
    return null;
  }
}

function UnitDetails({ unit, productName, onClose }) {
  if (!unit) return null;

  const photoUrl = validPublicUrl(unit.photoUrl);
  const passportUrl = validPublicUrl(unit.passportUrl);

  const qaDate = unit.latestQaDate
    ? new Date(unit.latestQaDate)
    : null;

  const formattedDate =
    qaDate && !Number.isNaN(qaDate.getTime())
      ? qaDate.toLocaleDateString("en-PH", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "Asia/Manila",
        })
      : "Not recorded";

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10">

      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-6">

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Individual Component Profile
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {productName}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Unit ID: {unit.unitId}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          ← Back to Units
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="mt-10 grid gap-10 lg:grid-cols-2">

        {/* COMPONENT PHOTO */}
        <div className="self-start overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

          <div className="flex min-h-80 items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">

            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${productName} - ${unit.unitId}`}
                className="max-h-96 w-full object-contain p-6"
              />
            ) : (
              <div className="text-center">

                <div className="text-6xl">⚡</div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  Component photo not available yet
                </p>

              </div>
            )}

          </div>

          <div className="border-t border-slate-200 bg-white px-6 py-4">

            <p className="text-xs text-slate-500">
              Individual component documentation
            </p>

          </div>

        </div>


        {/* COMPONENT INFORMATION */}
        <div>

          <div className="flex items-center justify-between">

            <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
              {unit.availability}
            </span>

            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(unit.pricePHP)}
            </span>

          </div>


          {/* SPECIFICATIONS */}
          <div className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-200">

            {[
              ["Unit ID", unit.unitId],
              ["Physical Grade", unit.physicalGrade],
              ["QA Summary", unit.qaStatus],
              ["Latest QA Date", formattedDate],
              ["Availability", unit.availability],
            ].map(([label, value]) => (

              <div
                key={label}
                className="flex items-center justify-between gap-4 px-5 py-4"
              >

                <span className="text-sm text-slate-500">
                  {label}
                </span>

                <span className="text-right text-sm font-semibold text-slate-900">
                  {value || "Not specified"}
                </span>

              </div>

            ))}

          </div>


          {/* CONDITION NOTES */}
          <div className="mt-8">

            <h3 className="text-lg font-bold text-slate-900">
              Condition Notes
            </h3>

            <p className="mt-3 rounded-xl bg-slate-50 p-5 text-sm leading-relaxed text-slate-600">
              {unit.conditionNotes || "No condition notes recorded."}
            </p>

          </div>

{/* CUSTOMER INQUIRY */}
<div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">

  <h3 className="text-xl font-bold text-slate-900">
    Interested in This Component?
  </h3>

  <p className="mt-3 text-sm leading-relaxed text-slate-600">
    Contact Circuit Loop Hub through Facebook Messenger
    to inquire about availability and purchasing arrangements.
  </p>

  <div className="mt-5 rounded-xl border border-blue-100 bg-white p-4">

    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
      Reference Unit ID
    </p>

    <p className="mt-2 text-lg font-bold text-slate-900">
      {unit.unitId}
    </p>

    <p className="mt-2 text-xs text-slate-500">
      Include this Unit ID when sending your inquiry.
    </p>

  </div>

  <a
    href="https://m.me/61595870237583"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-6 flex w-full items-center justify-center rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-blue-500"
  >
    Inquire via Messenger ↗
  </a>

  <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
    Available fulfillment options: Meetups within Batangas City
    or Lalamove delivery at the customer's expense.
  </p>

</div>

          {/* DIGITAL PASSPORT */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <h3 className="text-lg font-bold text-slate-900">
              Digital Component Passport
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Access the component's documented inspection
              details, available test results, and condition
              information.
            </p>

            {passportUrl ? (

              <a
                href={passportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                View Digital Passport →
              </a>

            ) : (

              <div className="mt-6 rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-slate-500">
                Digital passport not yet available
              </div>

            )}

          </div>

          <p className="mt-5 text-xs text-slate-500">
            QA summaries reflect inventory records. Review
            the detailed testing documentation before purchasing.
          </p>

        </div>

      </div>

    </section>
  );
}

export default UnitDetails;