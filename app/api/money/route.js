export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const value = searchParams.get("value");
  const baseType = searchParams.get("baseType");
  const toType = baseType === "CLP" ? "BRL" : "CLP";

  if (!value || value.length < 1) {
    return Response.json({ data: null });
  }

  const apiResult = await getApiResult(baseType, toType);
  const converted = Math.round(apiResult.baseValue * value);

  return Response.json({
    todayBRL: apiResult.baseValue,
    moneyToConvert: `${value} ${baseType}`,
    result: `${toType === 'CLP' ? formatCLP(converted) : formatBRL(converted)}`,
  });
}

const formatCLP = (value) => {
    let money = new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'CLP',
    });

    return money.format(value)
}

const formatBRL = (value) => {
    let money = new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'BRL',
    });

    return money.format(value)
}

const getApiResult = async (baseType, toType) => {
  const apiKey = process.env.FAST_FOREX_API;

  const res = await fetch(
    `https://api.fastforex.io/fetch-one?from=${baseType}&to=${toType}&api_key=${apiKey}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return {
    baseCurrency: data.base,
    baseValue: data.result[toType],
    date: data.updated,
  };
};
