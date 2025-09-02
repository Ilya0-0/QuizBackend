import { UserRole } from 'src/common/contracts/enums/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  passwordHash: string;

  @Column({ default: UserRole.Student, enum: UserRole })
  role: UserRole;
}
