const categories = [
  {
    icon: "🧮",
    title: "Basic",
    description: "Everyday arithmetic calculations",
  },
  {
    icon: "📐",
    title: "Scientific",
    description: "Advanced mathematical functions",
  },
  {
    icon: "💻",
    title: "Programmer",
    description: "Binary, hexadecimal and bitwise tools",
  },
  {
    icon: "📊",
    title: "Statistics",
    description: "Probability and data analysis",
  },
  {
    icon: "💰",
    title: "Finance",
    description: "Loans, GST and investments",
  },
  {
    icon: "⚡",
    title: "Physics",
    description: "Engineering and science calculators",
  },
];

function Categories() {
  return (
    <section
      style={{
        padding: "80px 40px",
        background: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          marginBottom: "48px",
        }}
      >
        Explore Calculators
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "24px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {categories.map((item) => (
          <div
            key={item.title}
            style={{
              border: "1px solid #E5E7EB",
              borderRadius: "18px",
              padding: "28px",
            }}
          >
            <div style={{ fontSize: "2rem" }}>{item.icon}</div>

            <h3>{item.title}</h3>

            <p style={{ color: "#6B7280" }}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;