import { join } from 'node:path';
import { readFile } from 'node:fs';
import { promisify } from 'node:util';

class ReadDDLQueryPg {
  private readonly filePath: string;
  private readonly readFileAsync = promisify(readFile);

  constructor(fileName: string) {
    this.filePath = join(process.cwd(), 'sql', fileName);
  }

  async readQuery(): Promise<string> {
    try {
      const query = await this.readFileAsync(this.filePath, 'utf-8');
      return query;
    } catch (error: unknown) {
      throw new Error(`Erro ao ler o arquivo SQL: ${error}`);
    }
  }
}

export default ReadDDLQueryPg;
