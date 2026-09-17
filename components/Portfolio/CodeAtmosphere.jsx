const symbols = ["</>", "{ }", "const", "=>", "01", "API", "npm", "git", "useState", "&&", "</>", "#", "async", "{}", "404", "SQL", "CSS", "...", "return", "<>"];

export default function CodeAtmosphere() {
  return <div className="code-atmosphere" aria-hidden="true">{symbols.map((symbol, index) => <span key={`${symbol}-${index}`}>{symbol}</span>)}</div>;
}
