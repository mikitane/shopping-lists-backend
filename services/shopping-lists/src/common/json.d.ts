type JsonObject = { [property: string]: Json }

type Json =
  | string
  | number
  | boolean
  | null
  | JsonObject
  | Json[];