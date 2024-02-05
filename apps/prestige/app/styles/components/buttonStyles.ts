export const buttonStyles = {
    root: {
      base: "outline-none inline-flex items-center justify-center gap-2 transition-all",
      block: {
        base: "w-full",
      },
      cursors: {
        default: "cursor-pointer",
        disable: "cursor-not-allowed",
      },
      fonts: {
        normal: "font-sans",
        nunito: "font-nunito",
        cormorant: "font-cormorant",
        brittany: "font-brittany",
      },
      sizes: {
        sm: "h-8 px-4 text-sm",
        md: "h-10 px-5 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-7 text-xl",
        custom: "h-[57px] lg:h-[73px] px-8 lg:px-12 text-[22px] lg:text-[28px] tracking-wider capitalize",
      },
      corners: {
        flat: "rounded-none",
        "soft-edge": "rounded-md",
        rounded: "rounded-full",
      },
      // NOTE: IF NO LABEL OR CHILDREN
      widthSizes: {
        sm: "w-8 !p-0",
        md: "w-10 !p-0",
        lg: "w-12 !p-0",
        xl: "w-14 !p-0",
        custom: "w-11 sm:w-[60px] !p-0",
      },
      variants: {
        solid: {
          colors: {
            primary: {
              base: "text-white",
              default:
                "bg-primary hover:bg-primary-600 focus:bg-primary-600 active:bg-primary-700",
              disable: "aria-disabled:bg-primary-200",
            },
            secondary: {
              base: "text-white",
              default:
                "bg-secondary hover:bg-secondary-600 focus:bg-secondary-600 active:bg-secondary-700",
              disable: "aria-disabled:bg-secondary-200",
            },
            info: {
              base: "text-white",
              default:
                "bg-info hover:bg-info-600 focus:bg-info-600 active:bg-info-700",
              disable: "aria-disabled:bg-info-200",
            },
            success: {
              base: "text-white",
              default:
                "bg-success hover:bg-success-600 focus:bg-success-600 active:bg-success-700",
              disable: "aria-disabled:bg-success-200",
            },
            warning: {
              base: "text-white",
              default:
                "bg-warning hover:bg-warning-600 focus:bg-warning-600 active:bg-warning-700",
              disable: "aria-disabled:bg-warning-200",
            },
            danger: {
              base: "text-white",
              default:
                "bg-danger hover:bg-danger-600 focus:bg-danger-600 active:bg-danger-700",
              disable: "aria-disabled:bg-danger-200",
            },
            default: {
              base: "text-white",
              default:
                "bg-default hover:bg-default-600 focus:bg-default-600 active:bg-default-700",
              disable: "aria-disabled:bg-default-200",
            },
          },
        },
        outline: {
          colors: {
            primary: {
              base: "border",
              default:
                "hover:bg-primary-50 focus:bg-primary-50 active:bg-primary-100 border-primary hover:border-primary-600 focus:border-primary-600 active:border-primary-700 text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700",
              disable:
                "aria-disabled:border-primary-200 aria-disabled:text-primary-200",
            },
            secondary: {
              base: "border",
              default:
                "hover:bg-secondary-50 focus:bg-secondary-50 active:bg-secondary-100 border-secondary hover:border-secondary-600 focus:border-secondary-600 active:border-secondary-700 text-secondary hover:text-secondary-600 focus:text-secondary-600 active:text-secondary-700",
              disable:
                "aria-disabled:border-secondary-200 aria-disabled:text-secondary-200",
            },
            info: {
              base: "border",
              default:
                "hover:bg-info-50 focus:bg-info-50 active:bg-info-100 border-info hover:border-info-600 focus:border-info-600 active:border-info-700 text-info hover:text-info-600 focus:text-info-600 active:text-info-700",
              disable:
                "aria-disabled:border-info-200 aria-disabled:text-info-200",
            },
            success: {
              base: "border",
              default:
                "hover:bg-success-50 focus:bg-success-50 active:bg-success-100 border-success hover:border-success-600 focus:border-success-600 active:border-success-700 text-success hover:text-success-600 focus:text-success-600 active:text-success-700",
              disable:
                "aria-disabled:border-success-200 aria-disabled:text-success-200",
            },
            warning: {
              base: "border",
              default:
                "hover:bg-warning-50 focus:bg-warning-50 active:bg-warning-100 border-warning hover:border-warning-600 focus:border-warning-600 active:border-warning-700 text-warning hover:text-warning-600 focus:text-warning-600 active:text-warning-700",
              disable:
                "aria-disabled:border-warning-200 aria-disabled:text-warning-200",
            },
            danger: {
              base: "border",
              default:
                "hover:bg-danger-50 focus:bg-danger-50 active:bg-danger-100 border-danger hover:border-danger-600 focus:border-danger-600 active:border-danger-700 text-danger hover:text-danger-600 focus:text-danger-600 active:text-danger-700",
              disable:
                "aria-disabled:border-danger-200 aria-disabled:text-danger-200",
            },
            default: {
              base: "border",
              default:
                "hover:bg-default-50 focus:bg-default-50 active:bg-default-100 border-default hover:border-default-600 focus:border-default-600 active:border-default-700 text-default hover:text-default-600 focus:text-default-600 active:text-default-700",
              disable:
                "aria-disabled:border-default-200 aria-disabled:text-default-200",
            },
          },
        },
        ghost: {
          colors: {
            primary: {
              base: "",
              default:
                "text-primary hover:text-primary-600 focus:text-primary-600 active:text-primary-700 hover:bg-primary-50 focus:bg-primary-50 active:bg-primary-100",
              disable: "aria-disabled:text-primary-200",
            },
            secondary: {
              base: "",
              default:
                "text-secondary hover:text-secondary-600 focus:text-secondary-600 active:text-secondary-700 hover:bg-secondary-50 focus:bg-secondary-50 active:bg-secondary-100",
              disable: "aria-disabled:text-secondary-200",
            },
            info: {
              base: "",
              default:
                "text-info hover:text-info-600 focus:text-info-600 active:text-info-700 hover:bg-info-50 focus:bg-info-50 active:bg-info-100",
              disable: "aria-disabled:text-info-200",
            },
            success: {
              base: "",
              default:
                "text-success hover:text-success-600 focus:text-success-600 active:text-success-700 hover:bg-success-50 focus:bg-success-50 active:bg-success-100",
              disable: "aria-disabled:text-success-200",
            },
            warning: {
              base: "",
              default:
                "text-warning hover:text-warning-600 focus:text-warning-600 active:text-warning-700 hover:bg-warning-50 focus:bg-warning-50 active:bg-warning-100",
              disable: "aria-disabled:text-warning-200",
            },
            danger: {
              base: "",
              default:
                "text-danger hover:text-danger-600 focus:text-danger-600 active:text-danger-700 hover:bg-danger-50 focus:bg-danger-50 active:bg-danger-100",
              disable: "aria-disabled:text-danger-200",
            },
            default: {
              base: "",
              default:
                "text-default hover:text-default-600 focus:text-default-600 active:text-default-700 hover:bg-default-50 focus:bg-default-50 active:bg-default-100",
              disable: "aria-disabled:text-default-200",
            },
          },
        },
      },
      icon: {
        base: "animate-spin",
      },
    },
  };
  