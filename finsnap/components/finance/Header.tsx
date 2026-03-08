"use client";

type View = 'dashboard' | 'add' | 'budgets';
interface HeaderProps {
    view: View; // Current active view
    onNavigate: (view: View) => void; // Function to handle navigation
}

const navItems: { label: string, view: View }[] = [
    { label: 'Overview', view: 'dashboard' }, // Object 1
    { label: '+ Add', view: 'add' }, // Object 2
    { label: 'Budgets', view: 'budgets' }, // Object 3
]

const Header = ({ view, onNavigate }: HeaderProps) => {
    return (
        <header className="sticky top-0 z-50 h-14 px-6 flex items-center justify-between bg-ink">
            {/* Logo */}
            <div className="font-display text-3xl text-paper tracking-tight flex items-center">
                Fin<span className="text-warning text-sm align-middle">&bull;</span>Snap
            </div>

            {/* Nav */}
            <nav className="flex gap-1">
                {navItems.map((item) => (
                    <button
                        key={item.view}
                        onClick={() => onNavigate(item.view)}
                        className={`
                            text-white px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        ${view === item.view ? 'bg-red' : 'bg-green'}
                        `}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

        </header >
    )
}

export default Header