import { Z64LibSupportedGames } from 'Z64Lib/API/Z64LibSupportedGames';
import { INPCTemplate, IModel } from '../INPCTemplate';

 class AdultMalon implements INPCTemplate {

    // The game that this object template is for
    game = Z64LibSupportedGames.OCARINA_OF_TIME;

    // File table ID (https://wiki.cloudmodding.com/oot/File_List/NTSC_1.0#File_0498_to_0879_.28Objects.29)
    file_index = 0x2B0;

    // Object table ID (https://wiki.cloudmodding.com/oot/Object_Table/NTSC_1.0)
    object_index = 0xD0;

    // Location of "MODLOADER64" in the proxy
    proxy_sig_location = 0x7F0;

    // Name of the proxy in the "proxies" folder
    proxy_name = "adult_malon_proxy.zobj";

    model: IModel;

    constructor(filename: string) {

        this.model = {
            filename: filename,
            eyes: {

                // Size of the eye texture *IN BYTES*
                // For CI8 textures, 1 bpp (bytes per pixel)
                // For RGBA16, 2 bpp
                size: 32 * 32 * 1, // w * h * bpp;

                // Number of eye textures in the bank
                amount: 3
            },
            mouth: {
                size: 32 * 16 * 1,
                amount: 3
            }
        }
    }

}

module.exports = AdultMalon;