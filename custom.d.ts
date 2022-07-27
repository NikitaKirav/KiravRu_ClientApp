declare module '*.svg' {
  const value: any;
  export = value;
}
declare module '*.png' {
  const value: any;
  export = value;
}
declare module '*.jpg' {
  const value: any;
  export = value;
}
declare module '*.webp' {
  const value: any;
  export = value;
}
declare module '*.css' {
  interface ClassNames {
      [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}
declare module '*.less' {
  interface ClassNames {
    [className: string]: string;
}
const classNames: ClassNames;
export = classNames;
}
