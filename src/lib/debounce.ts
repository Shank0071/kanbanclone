export const createDebouncer = (func: any, delay: any) => {
    let timeoutId: any;
  
    const debouncedFunction = (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  
    const cancel = () => {
      clearTimeout(timeoutId);
    };
  
    return { debouncedFunction, cancel };
  };
  



export const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  