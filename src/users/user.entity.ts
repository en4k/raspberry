// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  info1: string;

  @Column({ nullable: true })
  info2: string;

  @Column({ nullable: true })
  info3: string;

  @Column({ nullable: true })
  info4: string;
}

// 유저 엔티티 정의
