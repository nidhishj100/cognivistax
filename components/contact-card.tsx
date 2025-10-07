export default function ContactCard() {
  return (
    <div className="mt-6 rounded-xl p-6 border border-white/10 bg-white/5 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: "radial-gradient(120px 120px at 90% 10%, rgba(20,184,166,0.25), transparent 60%)" }}
      />
      <div className="relative">
        <h3 className="text-2xl font-semibold">Let’s Connect</h3>
        <div className="mt-4 text-sm leading-7">
          <div>
            <span className="opacity-70">Name:</span> <strong>Nidhish J</strong>
          </div>
          <div>
            <span className="opacity-70">Phone:</span>{" "}
            <a className="underline hover:opacity-80" href="tel:+916282350214">
              +91 6282350214
            </a>
          </div>
          <div>
            <span className="opacity-70">Email:</span>{" "}
            <a className="underline hover:opacity-80" href="mailto:nidhishjp123@gmail.com">
              nidhishjp123@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
