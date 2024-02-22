function ParsedText(text, color) {
  const parts = text.split(" ");
  return parts.map((part, index) => {
    if (part.startsWith("@")) {
      return (
        <span key={index} className={`${color} font-bold`}>
          {" "}
          {part}
        </span>
      );
    }
    return (
      <span key={index} style={{ color: "black" }}>
        {" "}
        {part}
      </span>
    );
  });
}

export default ParsedText;
