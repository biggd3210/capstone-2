import { useState, useEffect } from "react";

/** Custom hook for retrieving stored image based on id. 
 * 
 * This will populate a div to render a thumbnail used in lists/grids of documents. 
 */

function useThumbnailReturn(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {

        if (item === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, item);
        }
    }, [key, item]);

    return [item, setItem];
}

export default useThumbnailReturn;