import { Body } from "../layout/body"

export const _404 = () => {
    return (
        <Body className={'flex !h-full'}>
            <div className={'flex flex-col items-center justify-center h-full'}>
                <h1 className={'text-6xl font-bold w-fit'}>404</h1>
                <h2 className={'text-2xl font-bold w-fit'}>Page not found</h2>
            </div>

        </Body>
    )
}