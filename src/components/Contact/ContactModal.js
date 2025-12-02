import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * ContactModal
 * Props:
 *  - open (bool) : whether modal is visible
 *  - onClose (func) : close handler
 *  - webhookUrl (string) : Discord webhook URL. Falls back to process.env.REACT_APP_DISCORD_WEBHOOK
 *
 * Usage:
 *  <ContactModal open={isOpen} onClose={() => setIsOpen(false)} webhookUrl={YOUR_WEBHOOK} />
 *
 * Note: putting a webhook URL in client-side code exposes it publicly. Prefer server proxy for production.
 */

export default function ContactModal({ open, onClose, webhookUrl: propWebhook }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const WEBHOOK = propWebhook || process.env.REACT_APP_DISCORD_WEBHOOK;

    // Mounted state so we can animate out before unmounting
    const [isMounted, setIsMounted] = useState(open);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timeout;
        if (open) {
            setIsMounted(true);
            // wait for next frame to allow transition from hidden -> visible
            requestAnimationFrame(() => setIsVisible(true));
            document.body.style.overflow = "hidden";
        } else {
            setIsVisible(false);
            // allow animation to finish before unmounting
            timeout = setTimeout(() => setIsMounted(false), 320);
            document.body.style.overflow = "";
        }
        return () => {
            if (timeout) clearTimeout(timeout);
            document.body.style.overflow = "";
        };
    }, [open]);

    // Accessibility: close on Escape when mounted
    // Theme detection: prefer document class (e.g., Tailwind dark) or prefers-color-scheme
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === "undefined") return true;
        if (document.documentElement.classList.contains("dark")) return true;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
        return false;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
        function onChange() {
            setIsDark(document.documentElement.classList.contains("dark") || (mq && mq.matches));
        }
        onChange();
        if (mq && mq.addEventListener) mq.addEventListener("change", onChange);
        else if (mq && mq.addListener) mq.addListener(onChange);
        const observer = new MutationObserver(onChange);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
        return () => {
            if (mq && mq.removeEventListener) mq.removeEventListener("change", onChange);
            else if (mq && mq.removeListener) mq.removeListener(onChange);
            observer.disconnect();
        };
    }, []);

    // Accessibility: close on Escape when mounted
    useEffect(() => {
        if (!isMounted) return;
        function handleKey(e) {
            if (e.key === "Escape") onClose && onClose();
        }
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isMounted, onClose]);

    if (!isMounted) return null;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Lütfen tüm alanları doldurun.");
            return;
        }
        if (!WEBHOOK) {
            toast.error("Webhook ayarlı değil.");
            return;
        }

        setLoading(true);
        const content = `**Yeni İletişim Mesajı**\n**İsim:** ${name}\n**E-posta:** ${email}\n**Mesaj:**\n${message}`;

        try {
            const res = await fetch(WEBHOOK, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });

            if (!res.ok) throw new Error("Gönderilemedi");

            toast.success("Mesaj gönderildi. Teşekkürler!");
            setName("");
            setEmail("");
            setMessage("");
            onClose && onClose();
        } catch (err) {
            console.error(err);
            toast.error("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    }

    // Simple inline styles for a modern look
    const backdropStyle = {
        position: "fixed",
        inset: 0,
        background: isVisible ? (isDark ? "rgba(2,6,23,0.55)" : "rgba(2,6,32,0.08)") : "rgba(0,0,0,0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 20,
        transition: "background 260ms ease",
        WebkitTapHighlightColor: "transparent",
        backdropFilter: isVisible ? (isDark ? "blur(3px)" : "none") : "none",
    };
    const panelStyle = {
        width: "100%",
        maxWidth: 640,
        background: isDark
            ? "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(6,8,20,0.95))"
            : "#ffffff",
        color: isDark ? "#e6eef8" : "#041023",
        borderRadius: 14,
        boxShadow: isDark ? "0 12px 40px rgba(2,6,23,0.7)" : "0 8px 30px rgba(16,24,40,0.06)",
        padding: 24,
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 260ms cubic-bezier(.2,.9,.2,1), transform 300ms cubic-bezier(.2,.9,.2,1)",
        willChange: "transform, opacity",
        border: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(16,24,40,0.06)",
    };
    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(16,24,40,0.08)",
        background: isDark ? "rgba(255,255,255,0.03)" : "#fbfdff",
        color: isDark ? "#e6eef8" : "#04263b",
        marginTop: 8,
        outline: "none",
    };
    const labelStyle = { fontSize: 14, fontWeight: 600, color: isDark ? "#cfe8ff" : "#0b476c" };
    const btnPrimary = isDark
        ? {
              background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
              color: "#021026",
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              transition: "transform 160ms ease, box-shadow 160ms ease",
              boxShadow: "0 6px 18px rgba(7,10,35,0.5)",
          }
        : {
              background: "linear-gradient(90deg,#06b6d4,#7c3aed)",
              color: "#ffffff",
              padding: "10px 16px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 700,
              transition: "transform 160ms ease, box-shadow 160ms ease",
              boxShadow: "0 8px 22px rgba(12,38,63,0.08)",
          };
    const btnGhost = isDark
        ? {
              background: "transparent",
              color: "#cfe8ff",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.06)",
              cursor: "pointer",
          }
        : {
              background: "transparent",
              color: "#04263b",
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid rgba(16,24,40,0.06)",
              cursor: "pointer",
          };

    return (
        <div style={backdropStyle} onMouseDown={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                onMouseDown={(e) => e.stopPropagation()}
                style={panelStyle}
            >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div>
                        <h3 style={{ margin: 0, fontSize: 20 }}>İletişime Geç</h3>
                        <p style={{ margin: 0, marginTop: 6, color: "#98bdea", fontSize: 13 }}>
                            İsim, eposta ve mesajınızı bırakın — Discord webhook ile tarafımıza ulaşır.
                        </p>
                    </div>
                    <button
                        aria-label="Kapat"
                        onClick={onClose}
                        style={{ ...btnGhost, padding: 8, fontSize: 14, backdropFilter: "blur(2px)" }}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 12 }}>
                        <label style={labelStyle}>İsim</label>
                        <input
                            style={inputStyle}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Adınız"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 12 }}>
                        <label style={labelStyle}>E-posta</label>
                        <input
                            style={inputStyle}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={labelStyle}>Mesaj</label>
                        <textarea
                            style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Mesajınız..."
                            required
                        />
                    </div>

                    <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                        <button type="button" onClick={onClose} style={btnGhost}>
                            Vazgeç
                        </button>
                        <button type="submit" style={btnPrimary} disabled={loading}>
                            {loading ? "Gönderiliyor..." : "Gönder"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}