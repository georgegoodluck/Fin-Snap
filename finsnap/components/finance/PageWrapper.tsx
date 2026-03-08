interface PageWrapperProps {
    children: React.ReactNode;
    narrow?: boolean;
}

export function PageWrapper({ children, narrow = false }: PageWrapperProps) {
    return (
        <div className=
            {` mx-auto px-4 py-6
            ${narrow ? 'max-w-lg' : 'max-w-4xl'}
            `}>
            {children}
        </div>
    )
}