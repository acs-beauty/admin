import { ISlide } from "src/types/slides"

export const selectIsLoading = (state: { slides: { isLoading: boolean } }) => state.slides.isLoading

export const selectIsError = (state: { slides: { error: unknown | null } }) => state.slides.error

export const selectSlides = (state: { slides: { slides: ISlide[] } }) => state.slides.slides

export const selectCount = (state: { slides: { count: number } }) => state.slides.count
