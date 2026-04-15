import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  // Pass-through proxy function since NoteHub proxy middleware was removed
  return NextResponse.next();
}

export default proxy;
