type SkillSearchProps = {
  query: string,
  onChange: (event: any) => any
}

export default function SkillSearch({ query, onChange }: SkillSearchProps) {
  return (
    <div className="mb-3">
    Search: &nbsp;<input 
      className="p-1 rounded-md border border-gray-400 text-black"
      value={query}
      onChange={onChange}
      placeholder="Enter search text here..."
      />
    </div>
  )
}