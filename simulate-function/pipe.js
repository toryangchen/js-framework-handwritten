function pipe(...args) {
  return subArgs => {
    return args.reduce((acc, func, index) => {
      return func(acc);
    }, subArgs);
  };
}
