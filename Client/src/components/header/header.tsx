

export default function Header(){
    return (
        <div>
            <nav className="w-full h-20 shadow-xl flex justify-around items-center">
                <h1 className="text-white">Pomodoro</h1>
                <div className="flex items-center">
                    <button className="w-20 bg-white">Profile</button>
                </div> 
            </nav>
        </div>
    )
}