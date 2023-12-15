export const mockQueryIsLoading = jest.fn().mockReturnValue(false);
export const mockQueryData = jest.fn().mockReturnValue(null);

export const mockUseQuery = jest.fn().mockReturnValue({
  isLoading: mockQueryIsLoading(),
  data: mockQueryData(),
});

export const mockIsPending = jest.fn().mockReturnValue(false);
export const mockMutate = jest.fn();

export const mockUseMutation = jest.fn().mockReturnValue({
  isPending: mockIsPending(),
  mutate: mockMutate,
});

export { mockUseQuery as useQuery, mockUseMutation as useMutation };
