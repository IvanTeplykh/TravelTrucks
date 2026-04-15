export function parseSetCookie(cookieStr: string) {
  const parts = cookieStr.split(';').map(part => part.trim());
  if (parts.length === 0) return {};

  const [nameValue, ...attrs] = parts;
  const [name, ...valueParts] = nameValue.split('=');
  const value = valueParts.join('=');

  const result: any = { [name]: value };

  attrs.forEach((attr) => {
    const [key, ...valParts] = attr.split('=');
    const val = valParts.join('=');
    
    // Normalize keys to lowercase for easier access
    const lowerKey = key.toLowerCase().replace(/-([a-z])/g, (g) => g[1].toUpperCase()); // e.g. max-age -> maxAge
    const normalizedKey = lowerKey === 'maxAge' ? 'maxAge' : lowerKey;
    
    result[normalizedKey] = val || true;
  });

  return result;
}
