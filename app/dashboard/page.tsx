"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [progress, setProgress] = useState(65);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #0f0f1f, #050510 70%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "50px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "600",
          textShadow: "0px 0px 10px #00ffff",
          marginBottom: "30px",
        }}
      >
        🚀 Welcome to CognivistaX Dashboard
      </h1>

      <p style={{ maxWidth: "600px", textAlign: "center", opacity: 0.8 }}>
        Track your learning journey, visualize your strengths, and improve your
        skills every day.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          width: "100%",
          maxWidth: "1000px",
          marginTop: "50px",
        }}
      >
        {/* Strengths */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0,255,255,0.1), rgba(0,255,255,0.05))",
            border: "1px solid rgba(0,255,255,0.3)",
            borderRadius: "20px",
            padding: "25px",
            textAlign: "center",
            boxShadow: "0px 0px 20px rgba(0,255,255,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0px 0px 30px #00ffff")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0px 0px 20px rgba(0,255,255,0.2)")
          }
        >
          <h2>💪 Strengths</h2>
          <p>Algebra, Problem Solving</p>
        </div>

        {/* Weaknesses */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(255,0,128,0.1), rgba(255,0,128,0.05))",
            border: "1px solid rgba(255,0,128,0.3)",
            borderRadius: "20px",
            padding: "25px",
            textAlign: "center",
            boxShadow: "0px 0px 20px rgba(255,0,128,0.2)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0px 0px 30px #ff0080")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0px 0px 20px rgba(255,0,128,0.2)")
          }
        >
          <h2>⚠️ Weaknesses</h2>
          <p>Geometry, Time Management</p>
        </div>

        {/* Progress */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(0,128,255,0.1), rgba(0,128,255,0.05))",
            border: "1px solid rgba(0,128,255,0.3)",
            borderRadius: "20px",
            padding: "25px",
            textAlign: "center",
            boxShadow: "0px 0px 20px rgba(0,128,255,0.2)",
          }}
        >
          <h2>📈 Progress</h2>
          <div
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "20px",
              height: "20px",
              overflow: "hidden",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #00ffff, #0077ff, #0044ff)",
                height: "100%",
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>
          <p style={{ marginTop: "10px" }}>{progress}% Complete</p>
        </div>
      </div>

      {/* Suggested Path */}
      <div
        style={{
          marginTop: "60px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.2))",
          borderRadius: "20px",
          padding: "30px",
          maxWidth: "800px",
          textAlign: "center",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        <h2>🧭 Suggested Learning Path</h2>
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          <li>📘 Day 1: Algebra Deep Dive</li>
          <li>📗 Day 2: Geometry Refresher</li>
          <li>📙 Day 3: Timed Problem Practice</li>
          <li>📕 Day 4: Quiz Challenge</li>
        </ul>
      </div>
    </div>
  );
}
