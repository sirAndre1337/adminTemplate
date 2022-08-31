export default function Logo() {
    return (
        <div className="flex flex-col items-center justify-center bg-white h-11 w-11 rounded-full">
            <div className="h-3 w-3 rounded-full bg-green-600" />
            <div className="flex mt-0.5">
                <div className="h-3 w-3 rounded-full bg-yellow-600 mr-0.5" />
                <div className="h-3 w-3 rounded-full bg-gray-600" />
            </div>
        </div>
    )
}