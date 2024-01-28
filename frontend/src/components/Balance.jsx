

export const Balance = ({value}) => {
    return(
        <div className="flex">
            <div className="font-bold text-slate-700 text-lg">
                Your Balance
            </div>
            <div className="font-bold ml-4 text-slate-700 text-lg">
                Rs {value}
            </div>
        </div>
    )
}