import ThemeToggle from "./ThemeToggle";

export default function Header({ search, setSearch }) {
  return (
    <header className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
          PokéDex
        </h1>
        <ThemeToggle />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-5 py-3 rounded-lg bg-white dark:bg-slate-800
                     shadow border border-slate-200 dark:border-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     text-slate-800 dark:text-white
                     placeholder-slate-400"
        />
      </div>
    </header>
  );
}