import mysql from 'mysql2'

const pool = mysql.createPool({
    host : '127.0.0.1',
    user :'root',
    password: 'myPassword123',
    database: 'spendalyzer',
    timezone:'America/Los_Angeles'
}).promise()


export async function getList(){
    const [result] = await pool.query(`
    WITH DateData AS (
        SELECT
            DATE(Date) AS Date,
            JSON_ARRAYAGG(JSON_OBJECT('id', id, 'Title', Title, 'Amount', Amount)) AS DateData,
            SUM(Amount) AS TotalAmountPerDay
        FROM expenses
        GROUP BY DATE(Date)
        ORDER BY DATE(Date) DESC
    ),
    MonthData AS (
        SELECT
            YEAR(Date) AS Year,
            MONTH(Date) AS Month,
            JSON_ARRAYAGG(
                JSON_OBJECT('Date', Date, 'Data', DateData, 'DailyAmount', TotalAmountPerDay)) AS MonthData,
            SUM(TotalAmountPerDay) AS MonthlyAmount
        FROM DateData
        GROUP BY YEAR(Date), MONTH(Date)
    )
    SELECT
        Year,
        Month,
        MonthData,
        MonthlyAmount
    FROM MonthData
    ORDER BY Year DESC, Month DESC;
    `);
    return result
}

export async function getGraph(id){
    const [result] = await pool.query(`
   SELECT DATE_FORMAT(Date, '%Y-%m-%d') AS Date, SUM(Amount) AS DailySum 
   FROM expenses
   WHERE Date LIKE ?
   GROUP BY Date;
    `,[id+'%'])
    return result
}

export async function createExpense(title, amount, date){
    const [result] = await pool.query(`
    INSERT INTO expenses (Title, Amount, Date)
    VALUES (?, ?, ?)
    `,[title, amount, date])
    return result
}

export async function updateExpense(title, amount, id){
    const [result] = await pool.query(`
    UPDATE expenses 
    SET Title = ?, Amount = ?
    WHERE id = ?
    `,[title, amount, id])
    return result
}

export async function deleteExpense(id){
    const [result] = await pool.query(`
    DELETE FROM expenses
    WHERE id = ?
    `,[id])
    return result
}

