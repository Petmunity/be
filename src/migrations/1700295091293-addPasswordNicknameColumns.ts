import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordNicknameColumns1700295091293
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'password',
        type: 'varchar',
        isNullable: false,
      }),
    );

    await queryRunner.addColumn(
      'Users',
      new TableColumn({
        name: 'nickname',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
