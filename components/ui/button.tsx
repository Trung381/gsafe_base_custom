// import { ButtonHTMLAttributes, FC } from 'react';
// import { twMerge } from 'tailwind-merge';

// interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: 'primary' | 'secondary' | 'outline';
//   size?: 'sm' | 'md' | 'lg';
// }

// const Button: FC<ButtonProps> = ({
//   children,
//   className,
//   variant = 'primary',
//   size = 'md',
//   ...props
// }) => {
//   const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none';
  
//   const variantStyles = {
//     primary: 'bg-blue-600 text-white hover:bg-blue-700',
//     secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
//     outline: 'bg-transparent border border-current text-blue-600 hover:bg-blue-50'
//   };
  
//   const sizeStyles = {
//     sm: 'text-sm px-3 py-1',
//     md: 'text-base px-4 py-2',
//     lg: 'text-lg px-6 py-3'
//   };
  
//   const mergedClassName = twMerge(
//     baseStyles,
//     variantStyles[variant],
//     sizeStyles[size],
//     className
//   );

//   return (
//     <button className={mergedClassName} {...props}>
//       {children}
//     </button>
//   );
// };

// export default Button;



import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import Link from "next/link"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonBaseProps = {
  asChild?: boolean
  icon?: React.ReactNode
  text?: string
}

type ButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> &
  VariantProps<typeof buttonVariants>

type LinkButtonProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> &
  VariantProps<typeof buttonVariants> & {
    href: string
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps | LinkButtonProps>(
  (props, ref) => {
    const { className, variant, size, asChild = false, icon, text, children, ...rest } = props
    const content = (
      <>
        {text || children}
        {icon}
      </>
    )

    if ('href' in props) {
      return (
        <Link
          className={cn(buttonVariants({ variant, size, className }))}
          href={props.href}
          {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </Link>
      )
    }

    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }