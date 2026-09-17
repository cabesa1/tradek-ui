"use client";

import { useEffect, useId, useRef, useState } from "react";

const options = [
  { value: "supply_chain_finance", label: "Supply Chain Finance" },
  { value: "procurement", label: "Procurement Internacional" },
  { value: "produtos_motos", label: "Produtos da China" },
];

export function CustomSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    const saved = window.sessionStorage.getItem("tradek-unidade");
    const savedIndex = options.findIndex((option) => option.value === saved);
    if (savedIndex >= 0) {
      setSelected(options[savedIndex]);
      setActive(savedIndex);
    }
    const close = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  function choose(index: number) {
    setSelected(options[index]);
    setActive(index);
    window.sessionStorage.setItem("tradek-unidade", options[index].value);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") return setOpen(false);
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      return open ? choose(active) : setOpen(true);
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setOpen(true);
      setActive((current) => (current + step + options.length) % options.length);
    }
  }

  return (
    <div className={`custom-select ${open ? "is-open" : ""}`} ref={root}>
      <input type="hidden" name="unidade" value={selected.value} />
      <button type="button" aria-haspopup="listbox" aria-expanded={open} aria-controls={listId} onClick={() => setOpen((value) => !value)} onKeyDown={onKeyDown}>
        <span>{selected.label}</span><i aria-hidden="true" />
      </button>
      {open && <div className="custom-options" role="listbox" id={listId} aria-label="Unidade de interesse">
        {options.map((option, index) => <button type="button" role="option" aria-selected={selected.value === option.value} className={active === index ? "is-active" : ""} key={option.value} onPointerEnter={() => setActive(index)} onClick={() => choose(index)}>
          <span>{option.label}</span><b>{String(index + 1).padStart(2, "0")}</b>
        </button>)}
      </div>}
    </div>
  );
}
