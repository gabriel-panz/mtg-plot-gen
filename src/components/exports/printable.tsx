import { forwardRef, HTMLAttributes } from "react"

const Printable = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={props.className}
        >
            {children}
        </div>
    )
})
export default Printable;