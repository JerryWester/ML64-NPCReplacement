import { EventHandler } from 'modloader64_api/EventHandler';
import { IModLoaderAPI, IPlugin, ModLoaderEvents } from 'modloader64_api/IModLoaderAPI';
import { Z64RomTools } from 'Z64Lib/API/Z64RomTools';
import { Z64LibSupportedGames } from 'Z64Lib/API/Z64LibSupportedGames';
import { INPCTemplate } from './INPCTemplate';
import { readFileSync } from 'fs';
import { resolve } from 'path';


export class NPCReplacement implements IPlugin {

    models: INPCTemplate[] = [];
    ModLoader!: IModLoaderAPI;
    game: Z64LibSupportedGames = -1;

    preinit() {
        let playas = ((this as any)['metadata']['zzplayas'] as Record<string, string>);
        for (let key in playas){
            this.models.push(
                new (require(`./templates/${key}`) as new (filename: string) => INPCTemplate)(playas[key])
            );
        }
    }
    init() {
        if (this.ModLoader.isModLoaded('OotOnline')) {
            this.game = Z64LibSupportedGames.OCARINA_OF_TIME;
        } else if (this.ModLoader.isModLoaded('MajorasMaskOnline')) {
            this.game = Z64LibSupportedGames.MAJORAS_MASK;
        }
    }
    postinit() {}
    onTick() {}

    @EventHandler(ModLoaderEvents.ON_ROM_PATCHED)
    onRomPatched(evt: {rom: Buffer}) {
        let tools = new Z64RomTools(this.ModLoader, this.game);
        for (let i = 0; i < this.models.length; i++) {
            if (this.models[i].game === this.game) {
                let model = this.models[i];
                let proxy = readFileSync(resolve(__dirname, "proxies", model.proxy_name));
                let success = tools.recompressObjectFileIntoRom(evt.rom, model.object_index, proxy);
                if (success) {
                    this.ModLoader.logger.info(`Successfully compressed ${model.proxy_name} into ROM`);
                } else {
                    this.ModLoader.logger.warn(`Failed to compress ${model.proxy_name} into ROM`);
                    tools.noCRC(evt.rom);
                    let reloc = tools.relocateFileToExtendedRom(evt.rom, model.file_index, proxy);
                    this.ModLoader.logger.info(`Relocated file to ${reloc}`);
                }
            }
        }
    }

}

module.exports = NPCReplacement;