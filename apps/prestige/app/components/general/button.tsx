import React from "react";
import cn from "classnames";
import { buttonStyles } from "../../styles";

enum SizeEnum {
  sm,
  md,
  lg,
  xl,
  custom,
}

enum DefaultColorEnum {
  primary,
  secondary,
  info,
  success,
  warning,
  danger,
  default,
}

type TButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  icon?: string;
  label?: string | any;
  loading?: boolean;
  disabled?: boolean;
  layout?: "auto" | "block";
  type?: "button" | "reset" | "submit";
  variant?: "solid" | "outline" | "ghost";
  corner?: "flat" | "soft-edge" | "rounded";
  fonts?: "normal" | "nunito" | "cormorant" | "brittany";
  size?: keyof typeof SizeEnum;
  color?: keyof typeof DefaultColorEnum;
};

const Button: React.FC<TButtonProps> = (props) => {
  const {
    className,
    icon,
    label,
    children,
    id = "prestige-button",
    size = "custom",
    layout = "auto",
    type = "button",
    color = "primary",
    variant = "solid",
    corner = "rounded",
    fonts = "cormorant",
    disabled = false,
    loading = false,
    ...restProps
  } = props;

  const { root } = buttonStyles;

  const baseClasses = cn(
    id,
    root.base,
    root.sizes[size],
    root.fonts[fonts],
    root.corners[corner],
    root.variants[variant].colors[color].base,
    disabled || loading
      ? [root.cursors.disable, root.variants[variant].colors[color].disable]
      : [root.cursors.default, root.variants[variant].colors[color].default],
    {
      [root.block.base]: layout === "block",
      [root.widthSizes[size]]: !(label || children),
    },
    className
  );

  return (
    <button
      {...restProps}
      id={id}
      type={type}
      className={`${
        disabled ? "!cursor-not-allowed opacity-50" : ""
      } ${baseClasses}`}
      aria-disabled={disabled || loading}
      aria-label={label}
      disabled={disabled}
    >
      {loading ? "Loading..." : label || children}
    </button>
  );
};

export default Button;
