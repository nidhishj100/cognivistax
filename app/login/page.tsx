"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type FormErrors = Partial<FormData>;

export default function LoginPage() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const temp: FormErrors = {};

    if (!form.name.trim()) temp.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email))
      temp.email = "Valid email required";
    if (!/^[0-9]{10}$/.test(form.phone))
      temp.phone = "10-digit phone required";
    if (form.password.length < 6)
      temp.password = "Minimum 6 characters required";

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // ✉️ Future: integrate SendGrid or API route here
    console.log("Form Submitted:", form);
    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #050510 0%, #000010 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
      }}
    >
      {/* Glow Effect */}
      <div
        style={{
          position: "absolute",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background: "rgba(0,255,255,0.15)",
          filter: "blur(100px)",
          top: "20%",
          left: "10%",
          zIndex: 0,
        }}
      ></div>

      <form
        onSubmit={handleSubmit}
        style={{
          position: "relative",
          zIndex: 2,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(0,0,0,0.4))",
          border: "1px solid rgba(0,255,255,0.3)",
          padding: "40px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0px 0px 40px rgba(0,255,255,0.2)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            marginBottom: "10px",
            textShadow: "0px 0px 10px #00ffff",
          }}
        >
          CognivistaX Login
        </h1>
        <p style={{ opacity: 0.8, marginBottom: "30px" }}>
          Every learner is unique. Every path is different.
        </p>

        {/* Name */}
        <Field
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Email */}
        <Field
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />

        {/* Phone */}
        <Field
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        {/* Password */}
        <Field
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="submit"
          style={{
            background:
              "linear-gradient(90deg, #00ffff, #0077ff, #0044ff)",
            border: "none",
            padding: "12px 0",
            width: "100%",
            borderRadius: "10px",
            color: "white",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0px 0px 15px rgba(0,255,255,0.4)",
            transition: "all 0.3s ease",
          }}
        >
          {submitted ? "Submitted ✅" : "Login"}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  type: string;
  name: keyof FormData;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

function Field({ type, name, placeholder, value, onChange, error }: FieldProps) {
  return (
    <div style={{ marginBottom: "20px", textAlign: "left" }}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "8px",
          border: error
            ? "1px solid #ff4d4d"
            : "1px solid rgba(0,255,255,0.4)",
          background: "rgba(255,255,255,0.05)",
          color: "white",
          fontSize: "0.95rem",
          outline: "none",
          transition: "all 0.3s ease",
          boxShadow: error
            ? "0px 0px 10px rgba(255,0,0,0.5)"
            : "0px 0px 10px rgba(0,255,255,0.2)",
        }}
      />
      {error && (
        <small
          style={{
            color: "#ff4d4d",
            fontSize: "0.8rem",
            marginTop: "4px",
            display: "block",
          }}
        >
          {error}
        </small>
      )}
    </div>
  );
}
