import { BellIcon, HomeIcon, SettingsIcon } from "../icons";
import MenuItem from "./MenuItem";

export default function MenuLateral() {
    return (
        <aside>
            <ul>
                <MenuItem icone={HomeIcon} texto="Inicio" url="/" />
                <MenuItem icone={SettingsIcon} texto="Ajustes" url="/ajustes" />
                <MenuItem icone={BellIcon} texto="Notificações" url="/notificacoes" />
            </ul>
        </aside>
    )
}