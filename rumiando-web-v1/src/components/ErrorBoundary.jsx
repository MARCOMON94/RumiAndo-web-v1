import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            width: "min(92%, 760px)",
            margin: "120px auto 40px",
            padding: "32px",
            backgroundColor: "#ffffff",
            border: "1px solid #d9d3c4",
            borderRadius: "20px",
            boxShadow: "0 10px 28px rgba(35, 49, 39, 0.08)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "0.88rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              color: "#3f6b4b",
              marginBottom: "10px",
            }}
          >
            Error de aplicación
          </p>

          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              marginBottom: "14px",
              lineHeight: "1.1",
            }}
          >
            Ha ocurrido un error inesperado
          </h1>

          <p
            style={{
              maxWidth: "56ch",
              margin: "0 auto 24px",
              lineHeight: "1.7",
              color: "#5f6f63",
            }}
          >
            La aplicación ha encontrado un problema al renderizar una parte de la
            interfaz. Puedes volver al inicio o recargar la página.
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/" className="btn-primary">
              Volver al inicio
            </Link>

            <button
              type="button"
              onClick={this.handleReload}
              className="btn-secondary"
              style={{ cursor: "pointer" }}
            >
              Recargar página
            </button>
          </div>

          {this.state.error?.message && (
            <p
              style={{
                marginTop: "22px",
                fontSize: "0.92rem",
                color: "#8b948d",
              }}
            >
              Detalle técnico: {this.state.error.message}
            </p>
          )}
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;