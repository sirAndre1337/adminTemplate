import useAppData from "../../data/hook/useAppData";
import { BellIcon, HomeIcon, LogoutIcon, SettingsIcon } from "../icons";
import BotaoAlternarTema from "./BotaoAlternarTema";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    const {tema, alternarTema} = useAppData();

    return (
        <aside className="flex flex-col bg-gray-200 text-gray-700 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800">
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem icone={HomeIcon} texto="Inicio" url="/" />
                <MenuItem icone={SettingsIcon} texto="Ajustes" url="/ajustes" />
                <MenuItem icone={BellIcon} texto="Notificações" url="/notificacoes" />
            </ul>
                <ul className="flex items-center justify-center pb-5">
                <BotaoAlternarTema tema={tema} alternarTema={alternarTema} estarNoMenuLateral={true}/>
                </ul>
            <ul>
                <MenuItem
                    icone={LogoutIcon}
                    texto="Sair"
                    onClick={(msg) => console.log('Deslogar do sistema' + msg)}
                    className="text-red-600 dark:text-red-400 hover:bg-red-400 hover:text-white dark:hover:text-white"
                />
            </ul>
        </aside>
    )
}