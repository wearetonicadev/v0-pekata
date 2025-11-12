import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiltersData, FILTER_INFO } from "@/types/filters";



export const useAppliedFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [appliedFilters, setAppliedFilters] = useState(
    () => new URLSearchParams(searchParams)
  );

  const getToggledSearchParams = (
    key: keyof FiltersData,
    id: number | string,
    currentParams: URLSearchParams
  ): URLSearchParams => {
    const updated = new URLSearchParams(currentParams);
    const param = FILTER_INFO[key].urlParam;
    const stringId = String(id);

    const values = updated.get(param)?.split(",") ?? [];
    const hasId = values.includes(stringId);

    const newValues = hasId
      ? values.filter(v => v !== stringId)
      : [...values, stringId];

    if (newValues.length) {
      updated.set(param, newValues.join(","));
    } else {
      updated.delete(param);
    }

    return updated;
  };

  const toggleFilter = (key: keyof FiltersData, id: number | string) => {
    const updated = getToggledSearchParams(key, id, appliedFilters);
    setAppliedFilters(updated);
  };

  const toggleDateFilter = (
    key: keyof FiltersData,
    dateType: "from" | "to",
    dateValue: string
  ) => {
    const updated = new URLSearchParams(appliedFilters);
    const baseParam = FILTER_INFO[key].urlParam;
    const param = `${baseParam}_${dateType}`;

    if (dateValue) {
      updated.set(param, dateValue);
    } else {
      updated.delete(param);
    }

    setAppliedFilters(updated);
  };

  const applyFilters = () => {
    setSearchParams(appliedFilters);
  };


  const resetFilters = () => {
    setAppliedFilters(new URLSearchParams(searchParams));
  };

  useEffect(() => {
    setAppliedFilters(new URLSearchParams(searchParams));
  }, [searchParams]);

  return {
    appliedFilters,  
    searchParams,     
    toggleFilter,
    toggleDateFilter,    
    applyFilters,     
    resetFilters, 
  };
};
