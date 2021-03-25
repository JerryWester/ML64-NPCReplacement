import { Z64LibSupportedGames } from 'Z64Lib/API/Z64LibSupportedGames';
import { OotOnline_ModelAllocation } from './OotoAPI';

interface IBanks {

    /** Size of each texture. */
    size: number;
    
    /** Number of textures in the bank. */
    amount: number;

}

export interface IModel {

    /** Filename of the model. */
    filename: string;

    /** Buffer containing the file itself. */
    file?: Buffer;

    /** Allocation of the model, sent via `ALLOCATE_MODEL_BLOCK`. */
    alloc?: OotOnline_ModelAllocation;

    /** Eye banks. */
    eyes: IBanks;

    /** Mouth banks. */
    mouth: IBanks;

}

export interface INPCTemplate {

    /** Model details. */
    model: IModel;

    /** Object's game */
    game: Z64LibSupportedGames;

    /** {@link https://wiki.cloudmodding.com/oot/File_List/NTSC_1.0#File_0498_to_0879_.28Objects.29|File table} index. */
    file_index: number;

    /** {@link https://wiki.cloudmodding.com/oot/Object_Table/NTSC_1.0|Object table} index. */
    object_index: number;

    /** Location in the proxy where the signature is (`MODLOADER64`). */
    proxy_sig_location: number;

    /** Proxy file name (in `proxies` folder). */
    proxy_name: string;

}