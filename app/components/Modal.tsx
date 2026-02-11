"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const ORANGE = "#FE6900";

export type ModalMode = "beta" | "question" | string;

export type ModalFieldType = "text" | "email" | "textarea";

export type ModalField = {
  name: string;
  label: string;
  type: ModalFieldType;
  required?: boolean;
  placeholder?: string;
};

export type ModalPayload = {
  mode: ModalMode;
  [key: string]: string;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;

  title?: string;
  subtitle?: string;
  submitLabel?: string;

  mode?: ModalMode;
  fields?: ModalField[];

  onSubmit?: (payload: ModalPayload) => Promise<void> | void;
};

export default function Modal({
  open,
  onClose,
  title = "Записаться на бета-тестирование",
  subtitle = "Оставь контакты и мы пришлем тебе подробные инструкции как получить доступ к нашему приложению.",
  submitLabel = "Отправить",
  mode = "beta",
  fields,
  onSubmit,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  // ⬇️ NEW: 2 обязательных поля: имя + почта/телеграм
  const resolvedFields: ModalField[] = useMemo(() => {
    const beta: ModalField[] = [
      {
        name: "name",
        label: "Имя",
        type: "text",
        required: true,
        placeholder: "Иван",
      },
      {
        name: "contact",
        label: "Почта или Telegram",
        type: "text",
        required: true,
        placeholder: "you@example.com или @username",
      },
      {
        name: "comment",
        label: "Комментарий",
        type: "textarea",
        required: false,
        placeholder: "",
      },
    ];

    const question: ModalField[] = [
      {
        name: "name",
        label: "Имя",
        type: "text",
        required: true,
        placeholder: "Иван",
      },
      {
        name: "contact",
        label: "Почта или Telegram",
        type: "text",
        required: true,
        placeholder: "you@example.com или @username",
      },
      {
        name: "question",
        label: "Вопрос",
        type: "textarea",
        required: true,
        placeholder: "Напиши вопрос — ответим на почту или в Telegram.",
      },
    ];

    if (fields?.length) return fields;
    if (mode === "question") return question;
    return beta;
  }, [fields, mode]);

  type FormState = Record<string, string>;

  const initialForm: FormState = useMemo(() => {
    const obj: FormState = {};
    for (const f of resolvedFields) obj[f.name] = "";
    return obj;
  }, [resolvedFields]);

  const [form, setForm] = useState<FormState>(initialForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // ⬇️ NEW: ошибки по полям (для красной обводки)
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  // reset when opened / fields changed
  useEffect(() => {
    if (!open) return;
    setForm(initialForm);
    setSent(false);
    setSending(false);
    setFieldErrors({});
  }, [open, initialForm]);

  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const onBackdropMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    if (!panelRef.current.contains(e.target as Node)) onClose();
  };

  const update = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // ⬇️ NEW: как только пользователь начинает заполнять — убираем красную рамку
    setFieldErrors((prev) => ({ ...prev, [name]: false }));
  };

  // ⬇️ NEW: валидация без общего текста ошибки — только подсветка полей
  const validateFields = (): boolean => {
    const nextErrors: Record<string, boolean> = {};

    for (const f of resolvedFields) {
      const v = String(form[f.name] ?? "").trim();
      if (f.required && !v) nextErrors[f.name] = true;
    }

    // доп.проверка для contact: либо email, либо telegram (простая)
    const contact = String(form["contact"] ?? "").trim();
    if (contact) {
      const isEmail = /^\S+@\S+\.\S+$/.test(contact);
      const isTelegram = /^@?[a-zA-Z0-9_]{4,32}$/.test(contact);
      if (!isEmail && !isTelegram) nextErrors["contact"] = true;
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending || sent) return;

    const ok = validateFields();
    if (!ok) return;

    setSending(true);

    try {
      const payload: ModalPayload = { mode };
      for (const k of Object.keys(form)) payload[k] = form[k];

      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // заглушка — позже заменишь на API route
        await new Promise((r) => setTimeout(r, 600));
        console.log("Modal submit:", payload);
      }

      // ⬇️ NEW: показать "отправлено" и закрыть через 2 секунды
      setSent(true);
      setTimeout(() => {
        onClose();
      }, 3500);
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      onMouseDown={onBackdropMouseDown}
      aria-modal="true"
      role="dialog"
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-[620px] rounded-[28px] bg-white border border-black/10 shadow-soft overflow-hidden"
      >
        {/* subtle top glow */}
        <div
          aria-hidden
          className="absolute -top-24 left-1/2 h-[220px] w-[520px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(254,105,0,0.12)" }}
        />

        {/* close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute z-40 right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 backdrop-blur-xl hover:bg-white transition"
          aria-label="Закрыть"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="rgba(15,23,42,0.9)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="relative p-6 md:p-8">
          {/* header */}
          <div className="pr-12">
            <h3 className="text-xl md:text-2xl font-semibold text-slate-900">
              {title.includes("Корзина") ? (
                <>
                  {title.split("Корзина")[0]}
                  <span style={{ color: ORANGE, fontSize: "1.05em" }}>
                    Корзина
                  </span>
                  {title.split("Корзина")[1]}
                </>
              ) : (
                title
              )}
            </h3>

            {subtitle ? (
              <p className="mt-2 text-sm md:text-base text-slate-600">
                {subtitle}
              </p>
            ) : null}
          </div>

          {/* form */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {resolvedFields.map((f) => (
              <Field
                key={f.name}
                field={f}
                value={form[f.name]}
                onChange={(val) => update(f.name, val)}
                hasError={!!fieldErrors[f.name]}
              />
            ))}

            {sent ? (
              <div className="rounded-2xl border border-black/10 bg-white px-4 py-3 text-m text-slate-700">
                ✅ Мы получили заявку и скоро свяжемся с Вами!
              </div>
            ) : (
              <button
                type="submit"
                disabled={sending}
                className="mt-2 inline-flex w-full items-center justify-center rounded-full px-7 py-3 text-sm md:text-base font-semibold text-white shadow-soft transition hover:opacity-95 active:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: ORANGE }}
              >
                {sending ? "Отправляем…" : submitLabel}
              </button>
            )}

            {/* <div className="text-xs text-slate-500">
              Нажимая “{submitLabel}”, ты соглашаешься на обработку персональных
              данных.
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}

type FieldProps = {
  field: ModalField;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
};

function Field({ field, value, onChange, hasError }: FieldProps) {
  const base =
    "w-full rounded-2xl border bg-white/70 backdrop-blur-xl px-4 py-3 text-sm md:text-base text-slate-900 placeholder:text-slate-400 outline-none transition";

  const border = hasError
    ? "border-red-400 focus:border-red-500"
    : "border-black/10 focus:border-black/20";

  return (
    <label className="block">
      <div className="mb-1.5 text-sm font-semibold text-slate-900">
        {field.label}
        {field.required ? <span style={{ color: ORANGE }}> *</span> : null}
      </div>

      {field.type === "textarea" ? (
        <textarea
          className={`${base} ${border} min-h-[120px] resize-none`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
        />
      ) : (
        <input
          type={field.type === "email" ? "text" : field.type} // contact может быть email/telegram
          className={`${base} ${border}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          autoComplete={field.name === "name" ? "name" : "email"}
        />
      )}
    </label>
  );
}
