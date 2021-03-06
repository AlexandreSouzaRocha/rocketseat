import { ILocationDTO } from "../interfaces/ILocationDTO";

import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    BeforeCreate,
    HasOne
} from "sequelize-typescript";
import * as uuid from "uuid";
import DevDTO from "./DevDTO";

@Table({ tableName: 'locations', schema: 'omnistack10' })
class LocationDTO extends Model<LocationDTO> implements ILocationDTO {

    @PrimaryKey
    @Column({
        field: 'id',
        type: DataType.STRING,
        allowNull: true,
    })
    id?: string

    @Column({
        field: 'longitude',
        type: DataType.DOUBLE,
        allowNull: false
    })
    longitude!: string;

    @Column({
        field: 'latitude',
        type: DataType.DOUBLE,
        allowNull: false
    })
    latitude!: string;

    @HasOne(() => DevDTO)
    devs!: DevDTO[];

    @BeforeCreate
    static incrementUUID(location: ILocationDTO) {
        location.id = uuid.v4();
    }
}

export default LocationDTO;