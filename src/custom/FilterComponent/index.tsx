import { CloseButton } from '@/assets/styles/general/styles';
import { TextButton } from '@/assets/styles/users/styles';
import { Box, Checkbox, Collapse, Drawer, List, Stack, styled, Typography } from '@mui/material';
import _ from 'lodash';
import { useMemo, useState } from 'react';
import { InputAdornment, OutlinedInput } from '../../base';
import { SearchIcon } from '../../icons';
import ExpandLess from '../../icons/ExpandLess';
import ExpandMore from '../../icons/ExpandMore';
import FilterAlt from '../../icons/FilterAlt';
import { CHINESE_SILVER, DARK_SLATE_GRAY, WHITE } from '../../theme';
import { InfoTooltip } from '../InfoTooltip';
import {
  FilterButton,
  FilterDrawerDiv,
  FiltersCardDiv,
  FiltersDrawerHeader,
  FilterTitleButton
} from './styles';

export const InputAdornmentEnd = styled(InputAdornment)(() => ({
  borderLeft: `1px solid ${CHINESE_SILVER}`,
  height: '1.875rem',
  paddingLeft: '0.625rem',
  '@media (max-width: 590px)': {
    paddingLeft: '0'
  }
}));

/**
 * @component FilterSection
 * @description A functional component that renders a filter section.
 * @param {string} title - The title of the filter section.
 * @param {Array} options - The available options for the filter section.
 * @param {Object} filters - The selected filters.
 * @param {Object} openSections - The open/closed state of the filter sections.
 * @param {Function} onCheckboxChange - A function to handle checkbox change event.
 * @param {Function} onSectionToggle - A function to handle section toggle event.
 */
export const FilterSection = ({
  filterKey, // title is used as filter key
  sectionDisplayName,
  options,
  filters,
  openSections,
  onCheckboxChange,
  onSectionToggle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleTextFieldChange = (e) => setSearchQuery(e.target.value);

  const showSearch = options.length > 10;
  const searchedOptions = useMemo(
    () =>
      searchQuery
        ? options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
        : options,
    [searchQuery]
  );

  return (
    <div>
      <FilterTitleButton onClick={() => onSectionToggle(filterKey)}>
        <Typography variant="h6" fontWeight="bold">
          {_.toUpper(sectionDisplayName || filterKey)}
        </Typography>
        {openSections[filterKey] ? <ExpandLess /> : <ExpandMore />}
      </FilterTitleButton>
      <Collapse in={openSections[filterKey]} timeout="auto" unmountOnExit>
        <List component="div" sx={{ overflowY: 'auto', maxHeight: '25rem' }}>
          {showSearch && (
            <Box px={'0.5rem'}>
              <OutlinedInput
                type="search"
                fullWidth
                placeholder="Search "
                value={searchQuery}
                onChange={handleTextFieldChange}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornmentEnd position="end">
                    Total: {searchedOptions.length}
                  </InputAdornmentEnd>
                }
              />
            </Box>
          )}
          {searchedOptions.map((option, index) => (
            <Stack
              key={option.value + index}
              direction="row"
              alignItems="center"
              px={'0.5rem'}
              justifyContent="space-between"
            >
              <Stack direction="row" alignItems="center" gap="0.35rem">
                <Checkbox
                  id={`checkbox-${option.label}`}
                  checked={
                    Array.isArray(filters[filterKey])
                      ? filters[filterKey].includes(option.value)
                      : filters[filterKey] === option.value
                  }
                  onChange={(e) => onCheckboxChange(filterKey, option.value, e.target.checked)}
                  value={option.value}
                />

                {option.Icon && <option.Icon width="20px" height="20px" />}

                <Typography>{option.label}</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="0.35rem">
                {option.totalCount !== undefined &&
                  `(${option?.totalCount ? option.totalCount : 0})`}
                {option.description && (
                  <InfoTooltip variant="standard" helpText={option.description} />
                )}
              </Stack>
            </Stack>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

/**
 * @component FilterSidebarState
 * @description A functional component that manages the filter state.
 * @param {Array} lists - An array of filter sections and its options lists.
 * @param {Function} onApplyFilters - A function to apply the filters.
 */

export interface FilterSidebarStateProps {
  onApplyFilters: (filterObj: Filter) => void;
  lists: Filter[];
  value?: string;
}

export interface handleCheckboxChangeProps {}

const FilterSidebarState = ({ lists, onApplyFilters, value }: FilterSidebarStateProps) => {
  console.log('FilterSidebarState -> value', value);
  const [openSections, setOpenSections] = useState(() => {
    // Generate initial state with all sections open by default
    const initialOpenSections = {};
    lists.forEach((list) => {
      // If the list has a defaultOpen property to true
      // then set the section to open by default
      if (list?.defaultOpen) {
        initialOpenSections[list.filterKey] = true;
      } else {
        initialOpenSections[list.filterKey] = false;
      }
    });
    return initialOpenSections;
  });

  const handleSectionToggle = (filterKey: Filter['filterKey']) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [filterKey]: !prevOpenSections[filterKey]
    }));
  };

  /**
   * @function handleCheckboxChange
   * @description Handles the checkbox change event.
   * @param {string} filterKey - The name of the filter section.
   * @param {string} value - The value of the checkbox.
   * @param {boolean} checked - The checked state of the checkbox.
   */
  const handleCheckboxChange = (
    filterKey: Filter['filterKey'],
    value: FilterSidebarStateProps['value'],
    checked: boolean
  ) => {
    onApplyFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (lists.find((list) => list.filterKey === filterKey)?.isMultiSelect !== false) {
        // default is multi select
        if (!Array.isArray(updatedFilters[filterKey])) {
          updatedFilters[filterKey] = updatedFilters[filterKey] ? [updatedFilters[filterKey]] : []; // convert to array
        }
        updatedFilters[filterKey] = checked
          ? [...updatedFilters[filterKey], value]
          : updatedFilters[filterKey].filter((item) => item !== value);
        return updatedFilters;
      }
      updatedFilters[filterKey] = checked ? value : '';
      return updatedFilters;
    });
  };

  return (
    <>
      {lists.map((list, index) => (
        <FilterSection
          key={index}
          filterKey={list.filterKey}
          sectionDisplayName={list.sectionDisplayName}
          options={list.options}
          filters={value}
          openSections={openSections}
          onCheckboxChange={handleCheckboxChange}
          onSectionToggle={handleSectionToggle}
        />
      ))}
    </>
  );
};

/**
 * @function FilterSidebar
 * @description A functional component that renders the filter sidebar.
 * @param {Array} data - The data to be filtered.
 * @param {Function} setData - A function to set the filtered data.
 * @param {Array} lists - An array of filter sections and it's options lists.
 */
interface FilterOption {
  label: string;
  value: string;
}
interface Filter {
  filterKey: string;
  sectionLabel: string;
  defaultOpen: boolean;
  initialCheck: boolean;
  options: FilterOption[];
}

export interface FilterSidebarProps {
  setData: (filterObj: Filter) => void;
  lists: Filter[];
  value?: string;
}
const FilterSidebar = ({ setData, lists, value = '' }: FilterSidebarProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <FiltersCardDiv>
        <FilterSidebarState lists={lists} onApplyFilters={setData} value={value} />
      </FiltersCardDiv>
      <FilterDrawerDiv>
        <FilterButton variant="contained" onClick={handleDrawerOpen}>
          <FilterAlt height="20" width="20" fill={WHITE} />
          <TextButton>Filters</TextButton>
        </FilterButton>

        <Drawer anchor="bottom" open={openDrawer} variant="temporary" onClose={handleDrawerClose}>
          <Box sx={{ overflowY: 'hidden', height: '90vh' }}>
            <FiltersDrawerHeader>
              <Typography variant="h6" sx={{ color: WHITE }} component="div">
                Filters
              </Typography>
              {<CloseButton onClick={handleDrawerClose} width="2rem" height="2rem" />}
            </FiltersDrawerHeader>
            <Box style={{ height: '75vh', overflowY: 'auto' }}>
              <FilterSidebarState lists={lists} onApplyFilters={setData} value={value} />
            </Box>
            <Box sx={{ backgroundColor: DARK_SLATE_GRAY, height: '5vh' }}></Box>
          </Box>
        </Drawer>
      </FilterDrawerDiv>
    </>
  );
};

export default FilterSidebar;
